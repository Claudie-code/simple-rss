import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        Welcome to SimpleRSS! Your privacy is important to us, and we are
        committed to protecting it. This Privacy Policy explains how we collect,
        use, and protect your information when you use our website and services.
        By using SimpleRSS, you agree to the practices described in this policy.
      </p>

      <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
      <p className="mb-4">
        When you use our website, we may collect the following types of
        information:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Personal Information:</strong> When you sign up or contact us,
          we may collect information such as your name, email address, and
          preferences.
        </li>
        <li>
          <strong>Usage Data:</strong> We may collect information about how you
          use the website, including the pages you visit, the links you click,
          and other actions.
        </li>
        <li>
          <strong>Cookies and Tracking Technologies:</strong> We use cookies and
          similar technologies to enhance your experience, personalize content,
          and analyze site traffic.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">
        2. How We Use Your Information
      </h2>
      <p className="mb-4">
        We use the information we collect for the following purposes:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>To provide and improve our services.</li>
        <li>
          To communicate with you, including responding to your inquiries.
        </li>
        <li>To personalize your experience on SimpleRSS.</li>
        <li>To analyze website traffic and usage.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-3">
        3. How We Protect Your Information
      </h2>
      <p className="mb-4">
        We take reasonable measures to protect your information from
        unauthorized access, disclosure, alteration, and destruction. However,
        no method of transmission over the Internet or electronic storage is
        100% secure, so we cannot guarantee its absolute security.
      </p>

      <h2 className="text-2xl font-semibold mb-3">4. Third-Party Services</h2>
      <p className="mb-4">
        We may use third-party services, such as analytics tools, that collect,
        monitor, and analyze data. These third parties have their own privacy
        policies addressing how they use such information.
      </p>

      <h2 className="text-2xl font-semibold mb-3">5. Your Privacy Rights</h2>
      <p className="mb-4">
        You have the right to access, correct, or delete your personal
        information. If you wish to exercise these rights, please contact us at{" "}
        <Link href="mailto:support@simple-rss.com" className="text-blue-500">
          support@simple-rss.com
        </Link>
        .
      </p>

      <h2 className="text-2xl font-semibold mb-3">6. Changes to This Policy</h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the new policy on this page, and the changes
        will be effective as of the updated date at the top of this policy.
      </p>

      <h2 className="text-2xl font-semibold mb-3">7. Contact Us</h2>
      <p className="mb-4">
        If you have any questions or concerns about this Privacy Policy or your
        data, please contact us at{" "}
        <Link href="mailto:support@simple-rss.com" className="text-blue-500">
          support@simple-rss.com
        </Link>
        .
      </p>

      <p className="text-sm text-gray-500">Last updated on 6 September 2024.</p>
    </div>
  );
}
