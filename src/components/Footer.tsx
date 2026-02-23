export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-20">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Us */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Contact Us</h4>
            <p className="text-sm opacity-80 mb-2">
              Email:{" "}
              <a
                href="mailto:e-phit@manchester.ac.uk"
                className="underline hover:opacity-100 transition-opacity"
              >
                e-phit@manchester.ac.uk
              </a>
            </p>
            <p className="text-xs opacity-60 mt-4">
              Additional icons:{" "}
              <a
                href="https://www.flaticon.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-100"
              >
                Flaticon
              </a>{" "}
              attributions
            </p>
            <p className="text-xs opacity-60 mt-3">
              <strong>Disclaimer:</strong> The content provided here is for informational purposes
              regarding personal wellbeing and should not be considered medical advice. This is a
              demonstration site for research feedback purposes.
            </p>
          </div>

          {/* Find Us */}
          <div>
            <h4 className="font-semibold text-lg mb-3">Find Us</h4>
            <address className="text-sm opacity-80 not-italic leading-relaxed">
              The University of Manchester
              <br />
              Oxford Road
              <br />
              Manchester
              <br />
              M13 9PL
            </address>
          </div>

          {/* UoM Links */}
          <div>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.manchester.ac.uk/discover/privacy-information/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 hover:underline transition-opacity"
                >
                  Disclaimer
                </a>
              </li>
              <li>
                <a
                  href="https://www.manchester.ac.uk/discover/privacy-information/data-protection/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 hover:underline transition-opacity"
                >
                  Data Protection
                </a>
              </li>
              <li>
                <a
                  href="https://www.manchester.ac.uk/discover/privacy-information/copyright/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 hover:underline transition-opacity"
                >
                  Copyright Notice
                </a>
              </li>
              <li>
                <a
                  href="https://www.manchester.ac.uk/discover/accessibility/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 hover:underline transition-opacity"
                >
                  Web accessibility
                </a>
              </li>
              <li>
                <a
                  href="https://www.manchester.ac.uk/discover/privacy-information/freedom-of-information/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 hover:underline transition-opacity"
                >
                  Freedom of information
                </a>
              </li>
              <li>
                <span className="opacity-80">Charitable status</span>
              </li>
              <li>
                <span className="opacity-80">Royal Charter Number: RC000797</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
