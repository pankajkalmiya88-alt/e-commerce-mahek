import { ReactNode } from "react";

interface AuthContainerProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export const AuthContainer = ({
  children,
  title,
  subtitle,
}: AuthContainerProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light via-white to-background-gray flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg border border-border-light p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary via-primary to-secondary"></div>
          
          <div className="text-center mb-10">
            <h1 className="text-4xl font-playfair font-bold text-primary mb-3 tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-base font-inter text-text-secondary leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
