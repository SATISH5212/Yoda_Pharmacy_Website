import * as React from "react";

interface StepperProps {
  totalSteps: number;
  currentStep: number;
  steps: string[];
}

const Stepper: React.FC<StepperProps> = ({
  totalSteps = 1,
  currentStep = 1,
  steps = [],
}) => {
  return (
    <div className="w-full px-20 mx-auto py-2">
      <ol className="flex justify-between w-full">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <li
              key={stepNumber + `-${new Date().getTime()}`}
              className={`flex items-center ${
                stepNumber !== totalSteps ? "w-full" : ""
              }`}
            >
              <div className="flex items-center">
                <span
                  className={`flex items-center justify-center xl:w-8 xl:h-8 lg:w-5 lg:h-5 rounded-full text-sm font-normal text-white ${
                    isCompleted
                      ? "bg-green-700"
                      : isActive
                      ? "bg-primary-600"
                      : "bg-primary-600/80"
                  } `}
                  aria-current={isActive ? "step" : undefined}
                >
                  {stepNumber}
                </span>
                <span
                  className={`ml-2 xl:text-[15px] font-normal lg:text-[11px] inline-block min-w-[30px] max-w-[300px] overflow-hidden truncate  ${
                    isCompleted
                      ? "text-green-700"
                      : isActive
                      ? "text-primary-600"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
              </div>
              {stepNumber !== totalSteps && (
                <div className="flex-1 mx-4">
                  <div className="h-px border-0 border-t-2 border-dashed border-gray-300" />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export { Stepper };
