import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { isLoggedIn } from "../services/authService";
import { getFavorites, addFavorite, removeFavorite } from "../services/favoriteService";
import { getProperties } from "../services/PropertyService";

export default function Properties() {
    const [properties, setProperties] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        minPrice: "",
        maxPrice: "",
        bedrooms: "",
        bathroom: ""
    });

    const navigate = useNavigate();

    const fetchProperties = async () => {
        setLoading(true);
        try {
             const props = await getProperties(filters);
      setProperties(props);

            if (isLoggedIn()) {
                const favs = await getFavorites();
                setFavorites(favs.map((f) => f.propertyId));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
        fetchProperties();
    };

    const toggleFavorite = async (propertyId) => {
        if (!isLoggedIn()) {
            navigate("/login");
            return;
        }

        try {
            if (favorites.includes(propertyId)) {
                await removeFavorite(propertyId);
                setFavorites(favorites.filter((id) => id !== propertyId));
                toast.success('Property removed from favorites');
            } else {
                await addFavorite(propertyId);
                setFavorites([...favorites, propertyId]);
                toast.success('Property added to favorites');
            }
        } catch (err) {
            console.error(err);
            alert("Failed to update favorites");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">
                <i className="bi bi-house-door text-success me-2"></i>Available Properties
            </h2>

            <div className="row">
                <div className="col-md-3 mb-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-light text-dark">
                            <strong> <i className="bi bi-funnel"></i> Filters</strong>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleFilterSubmit} className="d-grid gap-3">
                                <input
                                    type="number"
                                    className="form-control"
                                    name="minPrice"
                                    placeholder="Min Price"
                                    value={filters.minPrice}
                                    onChange={handleFilterChange}
                                />
                                <input
                                    type="number"
                                    className="form-control"
                                    name="maxPrice"
                                    placeholder="Max Price"
                                    value={filters.maxPrice}
                                    onChange={handleFilterChange}
                                />
                                <input
                                    type="number"
                                    className="form-control"
                                    name="bedrooms"
                                    placeholder="Bedrooms"
                                    value={filters.bedrooms}
                                    onChange={handleFilterChange}
                                />
                                <input
                                    type="text"
                                    className="form-control"
                                    name="bathroom"
                                    placeholder="Bathroom"
                                    value={filters.bathroom}
                                    onChange={handleFilterChange}
                                />
                                <button type="submit" className="btn btn-primary w-100">
                                    Apply Filters
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-md-9">
                    {loading ? (
                        <div className="text-center mt-5">
                            <div className="spinner-border text-primary" role="status"></div>
                            <div className="mt-2">Loading...</div>
                        </div>
                    ) : properties.length === 0 ? (
                        <div className="alert alert-warning text-center">No properties found</div>
                    ) : (
                        <div className="row g-4">
                            {properties.map((p) => (
                                <div className="col-md-6 col-lg-4" key={p.id}>
                                    <div className="card shadow-sm h-100 position-relative">
                                        <button
                                            className={`btn position-absolute top-0 end-0 m-2 rounded-circle shadow-sm ${favorites.includes(p.id) ? "btn-success text-white" : "btn-outline-secondary"
                                                }`}
                                            onClick={() => toggleFavorite(p.id)}
                                            style={{ zIndex: 2 }}
                                        >
                                            <i className="bi bi-heart-fill"></i>
                                        </button>

                                        <img
                                            src={p.propertyImageUrl || "https://placehold.co/400x250"}
                                            className="card-img-top"
                                            alt={p.propertyTitle}
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />

                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title text-truncate">{p.propertyTitle}</h5>
                                            <p className="card-text text-muted">
                                                <span className="badge bg-success me-2">
                                                    {p.listingType ?? "Sale"}
                                                </span>
                                                <span className="badge bg-primary">
                                                    $ {p.price?.toLocaleString() || "N/A"}
                                                </span>
                                            </p>
                                            <Link
                                                to={`/properties/${p.id}`}
                                                className="btn btn-outline-primary mt-auto"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
}
