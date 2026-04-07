export function Footer() {
  return (
    <footer className="bg-white py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="font-serif text-2xl text-wedding-black mb-4">
          Made with ♥ for Rhiannon & Rashaad
        </h3>
        <p className="text-wedding-grey text-sm tracking-wide">
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://nathanieladiah.github.io"
            className="text-wedding-gold hover:underline"
            target="_blank"
          >
            nathanieladiah
          </a>{" "}
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}
