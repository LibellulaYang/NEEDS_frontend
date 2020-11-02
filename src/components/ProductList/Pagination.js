import React from 'react'
import { Link } from 'react-router-dom'

const Pagination = (props) => {
  const { postsPerPage, totalPosts, paginate } = props
  const pageNumbers = []
  const url = '/productlist/page'
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <>
      <nav>
        <ul className="pagination d-flex justify-content-center">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <Link
                to={url + number}
                className="page-link"
                onClick={() => paginate(number)}
              >
                {number}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Pagination