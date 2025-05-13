import React from "react";
import { Link } from "react-router-dom";

const CookiePolicy: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-center">Cookie Policy</h1>

      <p className="mb-4">
        SharkFund uses cookies and similar technologies to enhance user experience and track website performance. By using this site, you consent to our use of cookies as described in this policy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. What Are Cookies?</h2>
      <p className="mb-4">
        Cookies are small text files stored on your device when you visit a website. They help us understand how users interact with our platform and improve our service.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. Types of Cookies We Use</h2>
      <ul className="list-disc pl-5 mb-4 space-y-2">
        <li><strong>Essential Cookies:</strong> Necessary for platform functionality (e.g., login sessions).</li>
        <li><strong>Analytics Cookies:</strong> Track usage patterns and improve performance.</li>
        <li><strong>Functional Cookies:</strong> Remember user preferences for a better experience.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Managing Cookies</h2>
      <p className="mb-4">
        You can control or delete cookies through your browser settings. However, disabling essential cookies may affect platform functionality.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Third-Party Cookies</h2>
      <p className="mb-4">
        We may use trusted third-party tools (like Google Analytics) that place cookies on your device to collect anonymous usage data.
      </p>

      <p className="mt-6 text-sm text-gray-500 text-center">
        © {new Date().getFullYear()} SharkFund. All rights reserved.
      </p>
      <div className="flex justify-center mt-10">
        <Link
          to="/"
          className="bg-black text-white px-6 py-2 rounded-lg shadow hover:bg-gray-700 transition"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CookiePolicy;
