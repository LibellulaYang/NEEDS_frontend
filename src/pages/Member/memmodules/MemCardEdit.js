import React, { useState, useEffect } from 'react'
import axios from 'axios' // import memcarddata from './memcarddata.json'
import HashLoader from 'react-spinners/HashLoader'

import { useSelector } from 'react-redux' //引入redux
import { BsPersonFill } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'

function MemCardEdit(props) {
  const [memcard, setMemcard] = useState([])
  const [dataLoading, setDataLoading] = useState(false)
  const [name, setName] = useState([])
  const [gender, setGender] = useState([])
  const [phone_number, setPhone] = useState([])
  const [address, setAddress] = useState([])
  const [email, setEmail] = useState([])
  const [credit_card, setCredit] = useState([])
  const [id, setId] = useState(0)

  const isLogin = useSelector((state) => state.authentication.loggedIn) //redux判斷是否為login狀態
  const loginUser = useSelector((state) => state.authentication.user) //redux初始值設定為空值
  //axios get data
  //先接收資料後再判斷memid,val=memid從前端先判斷需求是否有傳到後端
  const getData = async (val) => {
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
    const newData = { name, gender, phone_number, address, email, credit_card }
    console.log('newData', newData)

    let url = `http://localhost:5000/member?id=${val}`
    const res = await axios
      .post(url, newData) //post資料
      .catch((err) => console.log('Error'.err)) //若失敗的話
    console.log('post-res', res)
    setTimeout(() => {
      setDataLoading(false)
      // alert('儲存完成')
    }, 2000)
    // console.log('伺服器回傳json資料', res.data)
    // setMemcard(res.data)
  }

  useEffect(() => {
    if (isLogin) {
      const memId = loginUser.user.id //確認為login狀態後,在取其id值
      console.log('memId', memId)
      getData(memId)
      setId(memId)
    } else {
      window.location.href = '/login' //若非login狀態則跳轉至login畫面
    }
  }, [])

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

                <button
                  onClick={() => {
                    updatememdata(id)
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
                            value={phone_number}
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
                            value={credit_card}
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

export default MemCardEdit
