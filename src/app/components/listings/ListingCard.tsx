"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";

import useCountries from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import HeartButton from "./HeartButton";
import Button from "../UI/Button";

type ListingCardProps = {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: SafeUser | null;
};

function ListingCard({
  data,
  reservation,
  onAction,
  disabled,
  actionId = "",
  actionLabel,
  currentUser,
}: ListingCardProps) {
  const router = useRouter();
  const { getCountryByValue } = useCountries();

  const location = getCountryByValue(data.locationValue);

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) return;

    onAction?.(actionId);
  };

  const price = reservation ? reservation.totalPrice : data.price;

  const reservationDate = () => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  };

  return (
    <div
      className="col-span-1 cursor-pointer group"
      onClick={() => router.push(`/listings/${data.id}`)}>
      <div className="flex flex-col w-full gap-2">
        <div className="relative w-full overflow-hidden aspect-square rounded-xl">
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="object-cover w-full h-full transition duration-300 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <strong className="text-gray-900">
          {location?.region}, {location?.label}
        </strong>
        <small className="font-normal text-neutral-500">
          {reservationDate() || data.category}
        </small>
        <div className="flex flex-row items-center gap-1">
          <strong className="text-gray-900">${price}</strong>
          {!reservation ? (
            <small className="text-sm font-normal text-neutral-600">
              night
            </small>
          ) : null}
        </div>
        {onAction && actionLabel ? (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        ) : null}
      </div>
    </div>
  );
}

export default ListingCard;
