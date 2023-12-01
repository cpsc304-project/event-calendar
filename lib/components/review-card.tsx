import { ReviewGetAllByEventId } from "@/lib/schema";
import Link from "next/link";

export function ReviewsCard(props: { review?: ReviewGetAllByEventId; createLink?: string }) {
  return (
    <>
      {props.createLink ? (
        <ReviewsCardCreate createLink={props.createLink} />
      ) : (
        <Link href={`/dashboard/reviews/${props.review!.review_id}`}>
          <div className="h-full w-full rounded-md border bg-blue-150 p-4 lg:p-5">
            <h4 className="font-bold">{props.review!.rating}</h4>
            <p>{props.review!.comment}</p>
          </div>
        </Link>
      )}
    </>
  );
}

function ReviewsCardCreate(props: { createLink: string }) {
  return (
    <Link href={props.createLink}>
      <div className="h-full w-full rounded-md border bg-blue-50 p-4 lg:p-5 flex content-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 mx-auto my-auto"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </div>
    </Link>
  );
}