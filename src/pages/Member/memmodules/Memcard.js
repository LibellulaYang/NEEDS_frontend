import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
} from 'react-router-dom'
import axios from 'axios' // import memcarddata from './memcarddata.json'
import Spinner from 'react-bootstrap/Spinner'

import { useSelector } from 'react-redux' //引入redux
import { BsPersonFill } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'

function MemCard(props) {
  const [memcard, setMemcard] = useState([])
  const [dataLoading, setDataLoading] = useState(false)
  const [name, setName] = useState([])
  const [gender, setGender] = useState([])
  const [age, setAge] = useState([])
  const [phone, setPhone] = useState([])
  const [address, setAddress] = useState([])
  const [email, setEmail] = useState([])
  const [credit, setCredit] = useState([])

  const isLogin = useSelector((state) => state.authentication.loggedIn) //redux判斷是否為login狀態
  const loginUser = useSelector((state) => state.authentication.user) //redux初始值設定為空值
  //axios get data
  //先接收資料後再判斷memid,val=memid從前端先判斷需求是否有傳到後端
  const memdata = async (val) => {
    setDataLoading(true)
    let url = `http://localhost:5000/member?id=${val}`
    const res = await axios.get(url).catch((err) => console.log('Error'.err))
    console.log('res.data', res.data)

    console.log('res.data.name', res.data[0].name)
    setMemcard(res.data)
    setName(res.data[0].name)
    setGender(res.data[0].gender)
    setPhone(res.data[0].phone_number)
    setEmail(res.data[0].email)
    setAddress(res.data[0].address)
    setCredit(res.data[0].credit_card)
    setDataLoading(false)
  }

  const updatememdata = async (val) => {
    setDataLoading(true)
    const newData = { name, gender, age, phone, email, address, credit }
    let url = `http://localhost:5000/member?id=${val}`
    const res = await axios.put(url).catch((err) => console.log('Error'.err))

    console.log('伺服器回傳json資料', res.data)
    setMemcard(res.data)
    setDataLoading(false)
  }

  useEffect(() => {
    if (isLogin) {
      const memId = loginUser.user.id //確認為login狀態後,在取其id值
      memdata(memId)
    } else {
      window.location.href = '/login' //若非login狀態則跳轉至login畫面
    }
  }, [])
  useEffect(() => {
    setTimeout(() => setDataLoading(false), 1000)
  }, [memcard])
  const loading = (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  )

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

                <button
                  onClick={() => {
                    updatememdata()
                  }}
                  className="btn btn-primary"
                >
                  儲存
                </button>
              </div>
            </p>
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  {memcard.map((item, index) => {
                    return (
                      <ul>
                        <li className="d-flex">
                          <label className="item" htmlFor="exampleInputEmail1">
                            姓名
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(event) => {
                              setName(event.target.value)
                            }}
                          />
                        </li>
                        <li className="d-flex">
                          <label className="item" htmlFor="exampleInputEmail1">
                            性別
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={gender}
                            onChange={(event) => {
                              setGender(event.target.value)
                            }}
                          />
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
                          <label className="item" htmlFor="exampleInputEmail1">
                            地址
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={address}
                            onChange={(event) => {
                              setAddress(event.target.value)
                            }}
                          />
                        </li>
                        <li className="d-flex">
                          <label className="item" htmlFor="exampleInputEmail1">
                            電話
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={phone}
                            onChange={(event) => {
                              setPhone(event.target.value)
                            }}
                          />
                        </li>
                        <li className="d-flex">
                          <label className="item" htmlFor="exampleInputEmail1">
                            Ｅmail
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={email}
                            onChange={(event) => {
                              setEmail(event.target.value)
                            }}
                          />
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
                          <label className="item" htmlFor="exampleInputEmail1">
                            信用卡
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            value={credit}
                            onChange={(event) => {
                              setCredit(event.target.value)
                            }}
                          />
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
