import { AudioOutlined } from "@ant-design/icons"
import { Button, Modal, Select, Space, Input } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getFlights } from "../../features/orders"
import { ImFilter } from "react-icons/im"
import { filtered } from "../../features/tasks"
import { GoSearch } from "react-icons/go"
const { Search } = Input

const FilterProduct = ({ flightsComponent, dispatched }) => {
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

  const onSearch = e => {
    const soy = [...flightsComponent].filter(d => {
      if (
        d.departure.city
          .toString()
          .toLowerCase()
          .includes(e.target.value.toString().toLowerCase())
      )
        return d
      if (
        d.arrival.city
          .toString()
          .toLowerCase()
          .includes(e.target.value.toString().toLowerCase())
      )
        return d
      if (
        d.departure.airport
          .toString()
          .toLowerCase()
          .includes(e.target.value.toString().toLowerCase())
      )
        return d
      if (
        d.arrival.airport
          .toString()
          .toLowerCase()
          .includes(e.target.value.toString().toLowerCase())
      )
        return d
      if (
        d.departure.date
          .toString()
          .toLowerCase()
          .includes(e.target.value.toString().toLowerCase())
      )
        return d
      if (
        d.arrival.date
          .toString()
          .toLowerCase()
          .includes(e.target.value.toString().toLowerCase())
      )
        return d
      if (
        d.departure.time
          .toString()
          .toLowerCase()
          .includes(e.target.value.toString().toLowerCase())
      )
        return d
      if (
        d.arrival.time
          .toString()
          .toLowerCase()
          .includes(e.target.value.toString().toLowerCase())
      )
        return d
      if (
        d.totalSeats
          .toString()
          .toLowerCase()
          .includes(e.target.value.toString().toLowerCase())
      )
        return d
      if (
        d.duration
          .toString()
          .toLowerCase()
          .includes(e.target.value.toString().toLowerCase())
      )
        return d
      if (
        d.number
          .toString()
          .toLowerCase()
          .includes(e.target.value.toString().toLowerCase())
      )
        return d
    })
    dispatch(dispatched(soy))
    console.log("soy soy", soy)
  }

  return (
    <div className="filterList">
      <Button size="small" type="primary" onClick={() => abrirModal2()}>
        <GoSearch />
      </Button>
      <Modal
        style={window.innerWidth <= 768 ? { top: 400 } : { top: 12, right: 35 }}
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
        {/*  <Select
          defaultValue="filter by"
          style={{ width: 120, left: 33, top: 5 }}
          onChange={handleChange}
          allowClear
        >
          <Option>Departure</Option>
          <Option>Arrival</Option>
          <Option>Departures Aiport</Option>
          <Option>Arrival Airport</Option>
          <Option>Departure Date</Option>
          <Option>Arrival Date</Option>
          <Option>Departure Time</Option>
          <Option>Arrival Time</Option>
          <Option>Seating</Option>
          <Option>Duration</Option>
          <Option>Number</Option>
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
 */}{" "}
      </Modal>
    </div>
  )
}

export default FilterProduct
