import "./index.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function FavouriteButton({ bookId }) {
  const user = useSelector((state) => state.auth.user);

  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5000/favourites?userId=${user.id}&bookId=${bookId}`)
      .then((res) => res.json())
      .then((data) => {
        setIsFavourite(data.length > 0);
      });
  }, [user, bookId]);

  const handleFavourite = () => {
    if (!user) {
      alert("Please login first.");
      return;
    }

    // Nếu đã favourite => remove
    if (isFavourite) {
      fetch(
        `http://localhost:5000/favourites?userId=${user.id}&bookId=${bookId}`,
      )
        .then((res) => res.json())
        .then((data) => {
          fetch(`http://localhost:5000/favourites/${data[0].id}`, {
            method: "DELETE",
          });

          setIsFavourite(false);
        });
    }
    // Nếu chưa favourite => add
    else {
      const favourite = {
        userId: user.id,
        bookId: bookId,
      };

      fetch("http://localhost:5000/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(favourite),
      }).then(() => {
        setIsFavourite(true);
      });
    }
  };

  return (
    <button className="favourite-btn" onClick={handleFavourite}>
      {isFavourite ? "❤️ Favourited" : "🤍 Favourite"}
    </button>
  );
}

export default FavouriteButton;
