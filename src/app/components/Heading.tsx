"use client";

type HeadingProps = {
  title: string;
  subtitle?: string;
  center?: boolean;
};

function Heading({ title, subtitle, center }: HeadingProps) {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold">{title}</div>
      {subtitle ? (
        <div className="mt-2 font-light text-neutral-500">{subtitle}</div>
      ) : null}
    </div>
  );
}

export default Heading;
