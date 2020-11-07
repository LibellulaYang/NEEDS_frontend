import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
} from 'react-router-dom'
import axios from 'axios' // import memcarddata from './memcarddata.json'
import HashLoader from 'react-spinners/HashLoader'

import { useSelector } from 'react-redux' //引入redux
import { BsPersonFill } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'

function MemCard(props) {
  const [memcard, setMemcard] = useState([])
  const [dataLoading, setDataLoading] = useState(false)

  const isLogin = useSelector((state) => state.authentication.loggedIn) //redux判斷是否為login狀態
  const loginUser = useSelector((state) => state.authentication.user) //redux初始值設定為空值
  //axios get data
  //先接收資料後再判斷memid,val=memid從前端先判斷需求是否有傳到後端
  const getData = async (val) => {
    setDataLoading(true)
    let url = `http://localhost:5000/member?id=${val}`
    const res = await axios.get(url).catch((err) => console.log('Error'.err))
    setMemcard(res.data)
    setDataLoading(false)
  }

  useEffect(() => {
    if (isLogin) {
      const memId = loginUser.user.id //確認為login狀態後,在取其id值
      getData(memId)
    } else {
      window.location.href = '/login' //若非login狀態則跳轉至login畫面
    }
  }, [])
  useEffect(() => {
    setTimeout(() => setDataLoading(false), 1000)
  }, [memcard])

  const loading = <HashLoader size={200} color={'#0d5661'} />

  const display = (
    <>
      <div className="memcard">
        <div className="col-md-10">
          <div className="maincard">
            <p className="font-m">
              <div className="d-flex wrapper">
                <p className="icons">
                  <BsPersonFill />
                </p>
                <p>會員資料</p>

                <Link to="/member/card/edit" className="icons">
                  <FaEdit />
                </Link>
              </div>
            </p>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  {memcard.map((item, index) => {
                    return (
                      <ul>
                        <li className="d-flex">
                          <div className="item">姓名</div>
                          <span>{item.name}</span>
                        </li>
                        <li className="d-flex">
                          <div className="item">性別</div>
                          <span>{item.gender}</span>
                        </li>
                        <li className="d-flex">
                          <div className="item">生日</div>
                          <span>{item.birthday}</span>
                        </li>
                        <li className="d-flex">
                          <div className="item">年齡</div>
                          <span>{item.age}</span>
                        </li>
                        <li className="d-flex">
                          <div className="item">地址</div>
                          <span>{item.address}</span>
                        </li>
                        <li className="d-flex">
                          <div className="item">電話</div>
                          <span>{item.phone_number}</span>
                        </li>
                        <li className="d-flex">
                          <div className="item">Ｅmail</div>
                          <span>{item.email}</span>
                        </li>
                      </ul>
                    )
                  })}
                </div>

                <div className="col-md-6">
                  {memcard.map((item, index) => {
                    return (
                      <ul>
                        <li className="d-flex">
                          <div className="item2">信用卡資料</div>
                          <span>{item.credit_card}</span>
                        </li>
                        <li className="d-flex">
                          <div className="item2">e幣</div>
                          <span>{item.e_coin}</span>
                        </li>
                        <li className="d-flex">
                          <div className="item2">購物紀錄</div>
                          <span>{item.shopping_record}</span>
                        </li>
                        <li className="d-flex">
                          <div className="item2">入會時間</div>
                          <span>{item.creat_date}</span>
                        </li>
                        <li className="d-flex">
                          <div className="item2">退貨紀錄</div>
                          <span>{item.return_product}</span>
                        </li>
                      </ul>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  return dataLoading ? loading : display
}

export default MemCard
