// src/pages/Favorites.js
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getFavorites, addFavorite, removeFavorite } from "../services/favoriteService";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favs = await getFavorites();
                setFavorites(favs);
            } catch (err) {
                console.error(err);
                alert("Failed to load favorites");
            } finally {
                setLoading(false);
            }
        };

        fetchFavorites();
    }, [navigate]);

    const toggleFavorite = async (propertyId) => {
        try {
            if (favorites.some(f => f.propertyId === propertyId)) {
                await removeFavorite(propertyId);
                setFavorites(favorites.filter(f => f.propertyId !== propertyId));
            } else {
                await addFavorite(propertyId);
                // No direct way to add details unless re-fetch, so we do it:
                const favs = await getFavorites();
                setFavorites(favs);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to update favorites");
        }
    };

    const handleViewDetails = (id) => {
        navigate(`/properties/${id}`, { state: { from: "/favorites" } });
    };

    if (loading) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container mt-4">
            <h2 className="mb-4">
                <i className="bi bi-heart-fill text-success"></i> My Favorites
            </h2>

            {favorites.length === 0 ? (
                <p>No favorite properties yet.</p>
            ) : (
                <div className="list-group">
                    {favorites.map((f) => (
                        <div
                            key={f.propertyId}
                            className="list-group-item list-group-item-action d-flex align-items-center p-3 shadow-sm mb-3 rounded"
                        >
                            {/* Image */}
                            <img
                                src={"https://placehold.co/400x250"}
                                alt={f.propertyTitle}
                                style={{ width: "150px", height: "100px", objectFit: "cover" }}
                                className="me-3 rounded"
                            />

                            {/* Details */}
                            <div className="flex-grow-1">
                                <h5 className="mb-1">{f.propertyTitle}</h5>
                                <p className="mb-1 text-muted">
                                    <span className="badge bg-success me-2">
                                        {f.propertyListingType === "1" ? "Rent" : "Sale"}
                                    </span>
                                    <span className="badge bg-primary">
                                        {f.propertyPrice?.toLocaleString() || "N/A"}
                                    </span>
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="d-flex flex-column align-items-end">
                                <button  onClick={() => handleViewDetails(f.propertyId)}
                                    className="btn btn-sm btn-outline-primary mb-2"
                                >
                                    View Detail
                                </button>
                                <button
                                    className={`btn btn-sm ${favorites.some(x => x.propertyId === f.propertyId)
                                        ? "btn-danger"
                                        : "btn-outline-success"
                                        }`}
                                    onClick={() => toggleFavorite(f.propertyId)}
                                >
                                    {favorites.some(x => x.propertyId === f.propertyId)
                                        ? "Remove"
                                        : "Add"} Favorite
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
