export default function Footer() {
    return (
        <div className="p-4 bg-gray-200 md:p-8 lg:p-10 dark:bg-gray-800">
            <div className="mx-auto max-w-screen-xl text-center">
                <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley' className="my-6 text-gray-500 dark:text-gray-400">This is just a demo footer that serves no real purpose. Definitely don&apos;t click me.</a>
                <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
                <li>
                    <a href="https://github.com/carter-et" className="text-blue-400 mr-4 hover:underline hover:text-blue-200 md:mr-6 ">GitHub</a>
                </li>
                <li>
                    <a href="https://www.linkedin.com/in/ethanlcarter/" className="text-blue-400 mr-4 hover:underline hover:text-blue-200 md:mr-6">LinkedIn</a>
                </li>
                <li>
                    <a href="mailto:carterethan98@gmail.com" className="text-blue-400 mr-4 hover:underline hover:text-blue-200 md:mr-6 ">Email</a>
                </li>
                </ul>
                <p className="my-6 text-gray-500 dark:text-gray-400">Built with NextJS & Tailwind<br></br> © Ethan Carter 2023</p>
            </div>
        </div>
    )
}