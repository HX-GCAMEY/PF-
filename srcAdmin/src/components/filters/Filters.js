import { AudioOutlined } from "@ant-design/icons"
import { Button, Modal, Select, Space, Input } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFlights } from "../../features/orders"
import { ImFilter } from "react-icons/im"
import { filtered } from "../../features/tasks"
const { Search } = Input

const Filters = ({ flightsComponent, dispatched }) => {
  /*  const flights = useSelector(state => state.tasks.flights)
  const flightsAv = useSelector(state => state.tasks.flightsAv)
  const flightsFiltered = useSelector(state => state.tasks.flightsFiltered)
  */ const dispatch = useDispatch()
  const [defaultValue, setDefaultValue] = useState(null)
  const [modal, setModal] = useState(false)
  const [filter, setFilter] = useState(null)

  const { Option } = Select

  const handleChange = e => {
    setDefaultValue(null)
    const response = flightsComponent.map(d => d[e])
    const dataArr = new Set(response)
    let result = [...dataArr]
    setFilter(result)
    setTimeout(() => {
      setDefaultValue(e)
    }, 300)
  }
  const filterChange = e => {
    const responde = flightsComponent.filter(d => d[defaultValue] === e)
    console.log("soy filtered", responde)
    dispatch(dispatched(responde))
    //cerrarModal2()
  }
  const putFlight = () => {
    console.log("hola")
  }

  const abrirModal2 = e => {
    console.log("soy abrir", e)
    setDefaultValue(null)
    setFilter("filter by")
    setModal(true)
  }
  const cerrarModal2 = e => {
    setModal(false)
    console.log(e)
  }
  const accion = () => {
    //cerrarModal2()
  }

  const resetList = () => {
    dispatch(dispatched(null))
    //cerrarModal2()
  }

  const a = flightsComponent.length && Object.keys(flightsComponent[0])

  const onSearch = d => {
    const soy = [...flightsComponent].filter(e => {
      let a = Object.values(e)
      for (let i of a.slice(1, a.length)) {
        if (
          i
            .toString()
            .toLowerCase()
            .includes(d.target.value.toString().toLowerCase())
        )
          return e
      }
    })
    dispatch(dispatched(soy))
    console.log("soy soy", soy)
  }

  return (
    <div className="filterList">
      <Button size="small" type="primary" onClick={() => abrirModal2()}>
        <ImFilter />
      </Button>
      <Modal

        style={window.innerWidth <= 768 ? { top: 400 } : { top: 12, right: 45 }}

        width={250}
        title="Filters"
        open={modal}
        onCancel={cerrarModal2}
        onOk={accion}
        footer={[
          <Button onClick={resetList} type="primary">
            Reset List
          </Button>,
          <Button onClick={cerrarModal2} type="primary">
            Close
          </Button>,
        ]}
      >
        <Space direction="vertical">
          <Search
            placeholder="input search text"
            onChange={onSearch}
            enterButton
            style={{ width: 200 }}
          />
        </Space>
        <Select
          defaultValue="filter by"
          style={{ width: 120, left: 33, top: 5 }}
          onChange={handleChange}
          allowClear
        >
          {a &&
            a.map((e, i) =>
              e !== "_id" && e !== "password" ? (
                <Option key={i} value={e}>
                  {e}
                </Option>
              ) : null
            )}
        </Select>
        {defaultValue && (
          <Select
            onChange={filterChange}
            style={{ width: 120, left: 33, top: 10 }}
            defaultValue={defaultValue}
            allowClear
          >
            {filter &&
              filter.map((e, i) => (
                <Option key={i} value={e}>
                  {e}
                </Option>
              ))}
          </Select>
        )}
      </Modal>
    </div>
  )
}

export default Filters
