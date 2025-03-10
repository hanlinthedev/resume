import Link from "next/link";

export default function Home() {
	return (
		<section className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
				<div className="text-center">
					<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
						ATS Resume Checker
					</h1>
					<p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
						Optimize your resume for Applicant Tracking Systems. Get instant
						feedback and improve your chances of landing interviews.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
						<Link
							href="/resume"
							className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							Get Started
						</Link>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
						<div className="text-blue-600 dark:text-blue-400 mb-4">
							<svg
								className="h-8 w-8"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
							ATS Optimization
						</h3>
						<p className="text-gray-600 dark:text-gray-300">
							Get detailed insights on how well your resume performs with ATS
							systems.
						</p>
					</div>

					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
						<div className="text-blue-600 dark:text-blue-400 mb-4">
							<svg
								className="h-8 w-8"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
								/>
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
							Smart Suggestions
						</h3>
						<p className="text-gray-600 dark:text-gray-300">
							Receive personalized recommendations to improve your resume&aposs
							effectiveness.
						</p>
					</div>

					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
						<div className="text-blue-600 dark:text-blue-400 mb-4">
							<svg
								className="h-8 w-8"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
								/>
							</svg>
						</div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
							Keyword Analysis
						</h3>
						<p className="text-gray-600 dark:text-gray-300">
							Identify missing keywords and optimize your content for specific
							job descriptions.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
