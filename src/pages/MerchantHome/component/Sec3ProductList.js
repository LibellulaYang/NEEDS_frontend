import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { addToCartAction, updateCartUnits } from '../../../actions/index'
import { Breadcrumb } from 'react-bootstrap'

import ForProductListCarousel from '../../../components/ProductList/ForProductListCarousel'
import Posts from '../../../components/ProductList/Posts'
import Pagination from '../../../components/ProductList/Pagination'
import ProductSideBar from '../../ProductList/ProductSidebar'
import Filter from '../../ProductList/Filter/Filter'
import SideFilter from '../../ProductList/Filter/SideFilter'

import '../../ProductList/ProductList.scss'

//test
import HistoryList from '../../../components/History/HistoryList'
import RecommendStoreForProductListPage from '../../../components/ProductList/RecommendStoreForProductListPage'

import axios from 'axios'

const Sec3ProductList = (props) => {
  // getdata
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [dataLoading, setDataLoading] = useState(false)

  //set page
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(12)

  // topFilter handle
  const [sort, setSort] = useState('')
  const [productView, setProductView] = useState(true)

  //set select Index to filter of Category
  const [selectCategory, setSelectCategory] = useState('')
  // 0 = can't use  1 = use
  const [ecoin, setEcoin] = useState(false)
  //Redux addCart
  const { cart, addToCartAction, updateCartUnits } = props

  useEffect(() => {
    getCategories()
  }, [])

  // axios get data
  useEffect(() => {
    const fetchPosts = async () => {
      setDataLoading(true)
      let url = 'http://localhost:5000/productlist' + sort
      const res = await axios.get(url).catch((err) => console.log('Error', err))
      setPosts(res.data)
      setDataLoading(false)
    }
    fetchPosts()
  }, [sort])

  //get all data

  const getCategories = async () => {
    setDataLoading(true)
    let url = 'http://localhost:5000/productlist/categories'
    const res = await axios
      .get(url)
      .catch((err) => console.log(`'Can't get categories`))
    setCategories(res.data)
    setDataLoading(false)
  }

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  // Change page
  const paginate = (pageNumber) => {
    window.scrollTo(0, 0)
    setCurrentPage(pageNumber)
  }

  // TopFilter handle
  const handleSort = (event) => {
    console.log(event.target.value)
    setSort(event.target.value)

    const sortRes = posts.sort((a, b) => {
      if (sort === '-price') {
        return a.skus[0].sale_price < b.skus[0].sale_price ? 1 : -1
      }
      if (sort === 'price') {
        return a.skus[0].sale_price > b.skus[0].sale_price ? 1 : -1
      }
    })
    setPosts(sortRes)
  }

  return (
    <>

      <div className="container productlist sec3 mt-5 mb-5">
 
        {/* Filter */}
        <div className="d-flex">
          <div className="sideFilter">
            <ProductSideBar
              categories={categories}
              setSelectCategory={setSelectCategory}
            />
            <SideFilter setEcoin={setEcoin} ecoin={ecoin} />
          </div>
          <div className="mainProductList">
            <Filter
              totalPosts={posts.length}
              handleSort={handleSort}
              setSort={setSort}
              setProductView={setProductView}
            />

            {/* dataView */}
            <Posts
              posts={currentPosts}
              dataLoading={dataLoading}
              productView={productView}
              addToCartAction={addToCartAction}
              ecoin={ecoin}
              selectCategory={selectCategory}
            />

            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = ({ cart }) => {
  return { cart }
}

export default connect(mapStateToProps, { addToCartAction, updateCartUnits })(
  Sec3ProductList
)