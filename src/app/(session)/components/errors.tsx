import { register } from "@/app/actions";

export default function Errors({
  errors,
}: {
  errors: Awaited<ReturnType<typeof register>>["errors"];
}) {
  return (
    <div>
      {Object.entries(errors).map(([key, value]) => (
        <p key={key} className="text-destructive">
          {value}
        </p>
      ))}
    </div>
  );
}
