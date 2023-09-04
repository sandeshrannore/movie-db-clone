import {useState} from 'react'
import styles from '../styles/AppBar.module.css'

const AppBar = () => {

    const [text, setText] = useState('')
    const [dropdown, setDropdown]= useState(false)

    const handleChange= (e: string)=> {
        setText(e)
        setDropdown(e.length>2)
    }


  return (
    <div className={styles.main}>
    <input
      value={text}
      onChange={(e) => handleChange(e.target.value)}
      placeholder='Movie'
    />
    <div className={dropdown? styles.dropdownactive: styles.dropdown}>{text}</div>
  </div>
  )
}

export default AppBar