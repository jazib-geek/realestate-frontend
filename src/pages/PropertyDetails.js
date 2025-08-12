import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function PropertyDetails() {
    const { id } = useParams();
    const location = useLocation();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const { data } = await api.get(`/properties/${id}`);
                setProperty(data);
            } catch (err) {
                console.error(err);
                alert("Failed to load property details");
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    const handleBack = () => {
        if (location.state?.from === "/favorites") {
            navigate("/favorites");
        } else {
            navigate("/properties");
        }
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;
    if (!property) return <div className="text-center mt-5">Property not found</div>;

    return (
        <div className="container mt-4">
            <button className="btn btn-outline-secondary mb-4" onClick={handleBack}>
               <i className="bi bi-arrow-left"></i> Back to {location.state?.from === "/favorites" ? "Favorites" : "Properties"}
            </button>

            <div className="card shadow-lg border-0">
                <div className="row g-0">
                    <div className="col-md-6">
                        <img
                            src={property.propertyImageUrl || "https://placehold.co/600x400"}
                            alt={property.propertyTitle}
                            className="img-fluid h-100 rounded-start"
                            style={{ objectFit: "cover" }}
                        />
                    </div>

                    <div className="col-md-6">
                        <div className="card-body p-4 d-flex flex-column">
                            <h2 className="card-title mb-3">{property.propertyTitle}</h2>

                            <div className="mb-3">
                                <span className="badge bg-success me-2 fs-6">
                                    {property.listingType ?? "Sale"}
                                </span>
                                <span className="badge bg-primary fs-6">
                                    {property.price
                                        ? `PKR ${property.price.toLocaleString()}`
                                        : "Price on request"}
                                </span>
                            </div>

                            <ul className="list-group list-group-flush mb-3">
                                <li className="list-group-item fw-semibold">
                                    <i className="fa fa-bed text-danger me-1"></i> Bedrooms:  {property.bedroomCount ?? 0}
                                </li>

                                <li className="list-group-item fw-semibold">
                                    <i className="fa fa-bath text-success me-1"></i> Bathrooms: {property.bathroomCount ?? 0}
                                </li>

                                <li className="list-group-item fw-semibold">
                                    <i className="fa fa-car text-warning me-1"></i> Car Spots : {property.carspotCount ?? 0}
                                </li>

                                <li className="list-group-item fw-semibold">
                                   <i className="fa fa-location-arrow text-primary me-2"></i> Location: {property.address || "Not specified"}
                                </li>
                            </ul>

                            <div className="mb-3">
                                <h5>Description</h5>
                                <p className="text-muted">
                                    {property.description || "No description available."}
                                </p>
                            </div>

                            <button className="btn btn-success btn-lg mt-auto">
                                Contact Seller
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
