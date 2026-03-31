import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { InvitationForm } from "../components/auth/InvitationForm";
import { PageTransition } from "../components/ui/PageTransition";
import { useInvitation } from "../hooks/useInvitation";
export function InvitationAccess() {
  const { code } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useInvitation();
  // If already authenticated, redirect to welcome or previous page
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || "/welcome";
      navigate(from, {
        replace: true,
      });
    }
  }, [isAuthenticated, navigate, location]);
  return (
    <PageTransition className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      {/* Background Image */}
      <div className="fixed inset-0">
        <img
          src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2069&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/90" />
      </div>

      <div className="w-full max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="mb-12"
        >
          <span className="text-wedding-gold text-sm tracking-[0.3em] uppercase block mb-4">
            Private Access
          </span>
          <h1 className="text-4xl md:text-5xl font-serif text-wedding-black mb-6">
            Guest Area
          </h1>
          <p className="text-gray-500 font-light text-lg max-w-md mx-auto">
            Welcome to our digital wedding celebration. Please enter your access
            code to view private details and RSVP.
          </p>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
            duration: 0.8,
          }}
        >
          <InvitationForm
            initialCode={code}
            onSuccess={() => navigate("/welcome")}
          />
        </motion.div>
      </div>
    </PageTransition>
  );
}
