function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto p-4 text-center text-gray-600 dark:text-gray-400">
                <p>&copy; {new Date().getFullYear()} DevHub. Built with React & TailwindCSS.</p>
            </div>
        </footer>
    )
}

export default Footer