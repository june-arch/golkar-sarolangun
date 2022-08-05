import { styleActive, styleNotActive } from '@/helpers/resource/table-admin';
import { paginate } from '@/helpers/utils/paginate'

type PaginationProps = {
	page?: number;
	limit?: number;
	setPage: (value: number) => void;
	meta?: any;
}

const Pagination = ({ page, limit, setPage, meta }: PaginationProps) => {
	const pages = (page && meta) && paginate(page, meta.totalPage);
	return (
		<tr className="flex flex-col sm:flex-no wrap sm:table-row mb-2 sm:mb-0">
			<td colSpan={6} className="px-3 sm:border-grey-light sm:border">
				<div className='py-6 flex flex-col md:flex-row  md:space-y-0 items-center space-y-5 justify-between'>
					<div className="p-2">
						{(limit && page && meta) ? `showing ${limit * (page - 1) + 1} to ${limit * (page - 1) + meta.totalDataOnPage} of ${meta.totalData} entries` : 'showing 0 to 0 of 0 entries'}
					</div>
					<ul className="inline-flex items-center -space-x-px">
						<li className={`${page ? (page == 1 ? 'pointer-events-none' : '') : 'pointer-events-none'}`}>
							<a
								onClick={() => page && setPage(page - 1)}
								className="cursor-pointer block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
							>
								<span className="sr-only">Previous</span>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
										clipRule="evenodd"
									></path>
								</svg>
							</a>
						</li>
						{(page && meta) && pages.map((value, index) => {
							return (
								<li key={index}>
									<a
										onClick={() => setPage(value)}
										className={page == value ? styleActive : styleNotActive}
									>
										{value}
									</a>
								</li>
							)
						})}
						<li
							className={`${page ? (page == meta.totalPage ? 'pointer-events-none' : ''): 'pointer-events-none'}`}
						>
							<a
								onClick={() => page && setPage(page + 1)}
								className="cursor-pointer block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
							>
								<span className="sr-only">Next</span>
								<svg
									className="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
										clipRule="evenodd"
									></path>
								</svg>
							</a>
						</li>
					</ul>
				</div>
			</td>
		</tr>   
  )
}

export default Pagination;