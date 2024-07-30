import React from 'react'

interface IProps {
    handleCollapse: () => void,
    handleToggled: () => void
    broken: boolean
}

const AdminHeader: React.FC<IProps> = ({ handleCollapse, handleToggled, broken }) => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark position-sticky top-0"
            style={{ backgroundColor: '#1A2023', zIndex: 99 }}>
            <div className="container-fluid">

                {broken &&
                    (<i className="fa-solid fa-bars text-white fs-2 m-2"
                        onClick={handleToggled} />)
                }
                {!broken &&
                    (<i className="fa-solid fa-bars text-white fs-2 m-2"
                        onClick={handleCollapse} />)
                }
            </div>
        </nav>
    )
}

export default AdminHeader