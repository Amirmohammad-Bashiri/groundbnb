"use client";

import { Range } from "react-date-range";

import Calendar from "../UI/inputs/Calendar";
import Button from "../UI/Button";

type ListingReservationProps = {
  price: number;
  totalPrice: number;
  dateRange: Range;
  onChangeDate: (val: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
};

function ListingReservation({
  disabledDates,
  dateRange,
  onChangeDate,
  onSubmit,
  price,
  totalPrice,
  disabled,
}: ListingReservationProps) {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={val => onChangeDate(val.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div className="flex items-center justify-between p-4 text-lg font-semibold">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
}

export default ListingReservation;
