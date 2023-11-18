const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function ContactUsFormSkeleton() {
    return (
        <div className={`${shimmer} flex bg-gray-50 p-4 m-16 md:p-6 max-w-4xl w-full font-arial`} />
    );
}