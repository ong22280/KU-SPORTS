import Stars from "@/app/components/Stars";
import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingAverage";
import { Review } from "@prisma/client";

export default function SportRating({ reviews }: { reviews: Review[] }) {
  // const spellingOfPlurals = () => (reviews.length > 1 ? "s" : "");

  return (
    <div className="flex items-end">
      <div className="flex items-center mt-2 ratings">
        <Stars reviews={reviews} />
        <p className="ml-3 text-reg">
          {calculateReviewRatingAverage(reviews).toFixed(1)}
        </p>
      </div>
      <div>
        <p className="ml-4 text-reg">
          {/* {reviews.length} Review{spellingOfPlurals()} */}
          {reviews.length} รีวิว
        </p>
      </div>
    </div>
  );
}
