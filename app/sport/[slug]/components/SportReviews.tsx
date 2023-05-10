import { Review } from "@prisma/client";
import SportReviewCard from "./SportReviewCard";

export default function SportReviews({ reviews }: { reviews: Review[] }) {
  // const spellingOfPlurals = () => {
  //   return reviews.length > 1 ? "people" : "person";
  // };

  return (
    <div>
      <h1 className="pb-5 mt-10 text-3xl font-bold mb-7 borber-b">
        มี {reviews.length} คนรีวิวกีฬานี้
      </h1>
      <div>
        {reviews.map((review) => (
          <SportReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
