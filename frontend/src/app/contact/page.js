export const metadata = {
  title: "Contact Us - GlamSide",
  description: "Get in touch with GlamSide",
};

export default function Contact() {
  return (
    <div className="min-h-screen pt-14">
      <div className="text-2xl mb-3">
        <h3 className="text-2xl mb-7">CONTACT US</h3>
      </div>
      <div className="text-gray-600 dark:text-gray-400 flex flex-col gap-4">
        <p><strong>Phone:</strong> +1-234-567-8901</p>
        <p><strong>Email:</strong> hello@glamside.com</p>
        <p><strong>Address:</strong> 123 Fashion Street, New York, NY 10001</p>
      </div>
    </div>
  );
}
