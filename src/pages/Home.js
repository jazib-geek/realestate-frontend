import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-3">Welcome to RealEstate Portal</h1>
      <p className="lead">
        Browse the best properties available for sale and rent.
      </p>
      <Link to="/properties" className="btn btn-primary btn-lg">
        View Properties
      </Link>
    </div>
  );
}
