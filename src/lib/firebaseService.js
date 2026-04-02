import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth, db } from "./firebase";

// ============================================
// INVITATION SERVICES
// ============================================

const INVITATIONS_COLLECTION = "invitations";

export const validateInvitationCode = async (code) => {
  try {
    const normalizedCode = code.trim().toUpperCase();
    const docRef = doc(db, INVITATIONS_COLLECTION, normalizedCode);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { code: docSnap.id, ...docSnap.data() };
    }
    return null;
  } catch (error) {
    console.error("Error validating invitation code:", error);
    return null;
  }
};

export const getAllInvitations = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, INVITATIONS_COLLECTION));
    return querySnapshot.docs.map((doc) => ({
      code: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching invitations:", error);
    return [];
  }
};

export const createInvitation = async (invitation) => {
  try {
    const docRef = doc(db, INVITATIONS_COLLECTION, invitation.code);
    await setDoc(docRef, {
      ...invitation,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error("Error creating invitation:", error);
    return false;
  }
};

export const updateInvitationRSVP = async (code, guestRSVPs, songRequest) => {
  try {
    const docRef = doc(db, INVITATIONS_COLLECTION, code);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return false;

    const invitation = docSnap.data();
    const updatedGuests = invitation.guests.map((guest) => {
      const update = guestRSVPs.find((r) => r.guestId === guest.id);
      if (update) {
        return {
          ...guest,
          rsvpStatus: update.status,
          dietaryNotes: update.dietaryNotes,
          mealPreference: update.mealPreference || "",
        };
      }
      return guest;
    });

    const updateData = {
      guests: updatedGuests,
      updatedAt: Timestamp.now(),
    };

    if (songRequest !== undefined) {
      updateData.songRequest = songRequest;
    }

    await updateDoc(docRef, updateData);

    return true;
  } catch (error) {
    console.error("Error updating RSVP:", error);
    return false;
  }
};

export const updateInvitationPhone = async (code, phoneNumber) => {
  try {
    const docRef = doc(db, INVITATIONS_COLLECTION, code);
    await updateDoc(docRef, {
      phoneNumber,
      updatedAt: Timestamp.now(),
    });
    return true;
  } catch (error) {
    console.error("Error updating phone number:", error);
    return false;
  }
};

export const deleteInvitation = async (code) => {
  try {
    await deleteDoc(doc(db, INVITATIONS_COLLECTION, code));
    return true;
  } catch (error) {
    console.error("Error deleting invitation:", error);
    return false;
  }
};

// ============================================
// GUESTBOOK SERVICES
// ============================================

const GUESTBOOK_COLLECTION = "guestbook";

export const getGuestbookMessages = async () => {
  try {
    const q = query(
      collection(db, GUESTBOOK_COLLECTION),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
    }));
  } catch (error) {
    console.error("Error fetching guestbook messages:", error);
    return [];
  }
};

export const addGuestbookMessage = async (guestName, message) => {
  try {
    const docRef = await addDoc(collection(db, GUESTBOOK_COLLECTION), {
      guestName,
      message,
      createdAt: Timestamp.now(),
    });

    return {
      id: docRef.id,
      guestName,
      message,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error adding guestbook message:", error);
    return null;
  }
};

export const subscribeToGuestbook = (callback) => {
  const q = query(
    collection(db, GUESTBOOK_COLLECTION),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(q, (querySnapshot) => {
    const messages = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
    }));
    callback(messages);
  });
};

// ============================================
// HONEYMOON FUND SERVICES
// ============================================

const HONEYMOON_ITEMS_COLLECTION = "honeymoonItems";
const CONTRIBUTIONS_COLLECTION = "contributions";

// for (const item of honeymoonItems) {
//       await addDoc(collection(db, HONEYMOON_ITEMS_COLLECTION), item);
//     }

export const addHoneymoonItem = async (item) => {
  try {
    const docRef = await addDoc(collection(db, HONEYMOON_ITEMS_COLLECTION), {
      ...item,
      currentAmount: 0,
    });
    return {
      id: docRef.id,
      ...item,
      currentAmount: 0,
    };
  } catch (error) {
    console.error("Error adding honeymoon item:", error);
    return null;
  }
};

export const getHoneymoonItems = async () => {
  try {
    const querySnapshot = await getDocs(
      collection(db, HONEYMOON_ITEMS_COLLECTION),
    );
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching honeymoon items:", error);
    return [];
  }
};

export const getContributions = async () => {
  try {
    const q = query(
      collection(db, CONTRIBUTIONS_COLLECTION),
      orderBy("createdAt", "desc"),
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt:
        doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
    }));
  } catch (error) {
    console.error("Error fetching contributions:", error);
    return [];
  }
};

export const addContribution = async (itemId, guestName, amount, message) => {
  try {
    // Add contribution record
    const docRef = await addDoc(collection(db, CONTRIBUTIONS_COLLECTION), {
      itemId,
      guestName,
      amount,
      message: message || "",
      createdAt: Timestamp.now(),
    });

    // Update honeymoon item's current amount
    const itemRef = doc(db, HONEYMOON_ITEMS_COLLECTION, itemId);
    await updateDoc(itemRef, {
      currentAmount: increment(amount),
    });

    return {
      id: docRef.id,
      itemId,
      guestName,
      amount,
      message,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error adding contribution:", error);
    return null;
  }
};

export const deleteContribution = async (itemId) => {
  try {
    await deleteDoc(doc(db, CONTRIBUTIONS_COLLECTION, itemId));
    return true;
  } catch (error) {
    console.error("Error deleting contribution:", error);
    return false;
  }
};

export const subscribeToHoneymoonItems = (callback) => {
  return onSnapshot(
    collection(db, HONEYMOON_ITEMS_COLLECTION),
    (querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(items);
    },
  );
};

// ============================================
// ADMIN AUTHENTICATION SERVICES
// ============================================

export const adminLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    console.error("Admin login error:", error);
    return null;
  }
};

export const adminLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Admin logout error:", error);
  }
};

export const subscribeToAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};

// ============================================
// SEED DATA FUNCTION (for initial setup)
// ============================================

// export const seedInitialData = async () => {
//   try {
//     // Seed invitations
//     const invitations = [
//       {
//         code: "WED2024",
//         groupName: "The Smith Family",
//         accessLevel: "full",
//         guests: [
//           { id: "1", name: "John Smith", rsvpStatus: "pending" },
//           { id: "2", name: "Jane Smith", rsvpStatus: "pending" },
//         ],
//       },
//       {
//         code: "CEREMONY",
//         groupName: "Sarah Jones",
//         accessLevel: "ceremony",
//         guests: [{ id: "3", name: "Sarah Jones", rsvpStatus: "pending" }],
//       },
//       {
//         code: "VIPGUEST",
//         groupName: "James Wilson & Partner",
//         accessLevel: "full",
//         guests: [
//           { id: "4", name: "James Wilson", rsvpStatus: "pending" },
//           { id: "5", name: "Guest", rsvpStatus: "pending" },
//         ],
//       },
//     ];

//     for (const inv of invitations) {
//       await createInvitation(inv);
//     }

//     // Seed honeymoon items
//     const honeymoonItems = [
//       {
//         title: "Flight Tickets",
//         description: "Round-trip flights to Santorini, Greece",
//         targetAmount: 2400,
//         currentAmount: 800,
//         icon: "✈️",
//         category: "travel",
//       },
//       {
//         title: "Luxury Hotel Stay",
//         description: "7 nights at a cliffside resort with ocean views",
//         targetAmount: 3500,
//         currentAmount: 1200,
//         icon: "🏨",
//         category: "accommodation",
//       },
//       {
//         title: "Romantic Dinners",
//         description: "Fine dining experiences at local restaurants",
//         targetAmount: 800,
//         currentAmount: 400,
//         icon: "🍽️",
//         category: "experiences",
//       },
//       {
//         title: "Sunset Sailing",
//         description: "Private sunset cruise around the caldera",
//         targetAmount: 600,
//         currentAmount: 0,
//         icon: "⛵",
//         category: "activities",
//       },
//       {
//         title: "Wine Tasting Tour",
//         description: "Full-day tour of local wineries",
//         targetAmount: 400,
//         currentAmount: 200,
//         icon: "🍷",
//         category: "experiences",
//       },
//       {
//         title: "Couples Spa Day",
//         description: "Relaxing spa treatments and massages",
//         targetAmount: 500,
//         currentAmount: 500,
//         icon: "💆",
//         category: "experiences",
//       },
//     ];

//     for (const item of honeymoonItems) {
//       await addDoc(collection(db, HONEYMOON_ITEMS_COLLECTION), item);
//     }

//     // Seed guestbook messages
//     const messages = [
//       {
//         guestName: "Aunt Marie",
//         message:
//           "Wishing you both a lifetime of love and happiness. I can't wait to celebrate with you!",
//       },
//       {
//         guestName: "The Johnson Family",
//         message:
//           "Congratulations on your engagement! You two are perfect for each other.",
//       },
//       {
//         guestName: "Sarah & Mike",
//         message: "So excited for the big day! It's going to be beautiful.",
//       },
//       {
//         guestName: "Grandma Wilson",
//         message:
//           "May your love story be as beautiful as your wedding day. Love you both!",
//       },
//     ];

//     for (const msg of messages) {
//       await addGuestbookMessage(msg.guestName, msg.message);
//     }

//     console.log("Initial data seeded successfully!");
//   } catch (error) {
//     console.error("Error seeding data:", error);
//   }
// };
