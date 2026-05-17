const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content">
      <div>
        <p className="font-bold text-lg">DriveFleet - Premium Car Rental</p>
        <p>Your trusted partner for luxury and affordable car rentals</p>
      </div>
      <div>
        <div className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Privacy policy</a>
        </div>
      </div>
      <div>
        <p>© 2026 DriveFleet. All rights reserved</p>
      </div>
    </footer>
  )
}

export default Footer