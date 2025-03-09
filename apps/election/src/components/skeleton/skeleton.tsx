import React, { PropsWithChildren } from "react";

// Main Skeleton component
export const Skeleton = ({ rows = 3, columns = 1, isCard = false }) => {
  return (
    <div
      className={`w-full animate-pulse ${isCard ? "rounded-lg bg-white p-6 shadow-md" : ""}`}
    >
      {/* Header skeleton when isCard is true */}
      {isCard && (
        <div className="mb-6 flex items-center space-x-4">
          <div className="size-12 rounded-full bg-gray-200"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            <div className="h-3 w-1/4 rounded bg-gray-200"></div>
          </div>
        </div>
      )}

      {/* Main content skeleton */}
      <div className="space-y-4">
        {Array(rows)
          .fill(0)
          .map((_, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {Array(columns)
                .fill(0)
                .map((_, colIndex) => (
                  <div
                    key={`col-${rowIndex}-${colIndex}`}
                    className="space-y-3"
                  >
                    <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                    <div className="h-3 w-full rounded bg-gray-200"></div>
                    <div className="h-3 w-5/6 rounded bg-gray-200"></div>
                  </div>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};

// Text subcomponent
const Text = ({ width = "w-full", height = "h-4" }) => {
  return (
    <div className={`${height} ${width} animate-pulse rounded bg-gray-200`} />
  );
};

// Image subcomponent
const Image = ({
  height = "h-48",
  width = "w-full",
  rounded = "rounded-lg",
}) => {
  return (
    <div
      className={`${height} ${width} ${rounded} animate-pulse bg-gray-200`}
    />
  );
};

// Card subcomponent
const Card = ({ children }: PropsWithChildren) => {
  return (
    <div className="animate-pulse rounded-lg bg-white p-6 shadow-md">
      {children}
    </div>
  );
};

// List item subcomponent
const ListItem = () => {
  return (
    <div className="flex animate-pulse space-x-4 rounded-lg bg-white p-4 shadow-md">
      <div className="size-16 rounded-lg bg-gray-200"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/2 rounded bg-gray-200"></div>
        <div className="h-3 w-full rounded bg-gray-200"></div>
        <div className="h-3 w-4/5 rounded bg-gray-200"></div>
      </div>
    </div>
  );
};

// Attach subcomponents to main component using dot notation
Skeleton.Text = Text;
Skeleton.Image = Image;
Skeleton.Card = Card;
Skeleton.ListItem = ListItem;
