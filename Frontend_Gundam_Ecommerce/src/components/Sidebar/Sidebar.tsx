import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar as SidebarPro, SubMenu } from 'react-pro-sidebar';
import './Sidebar.css';

const Sidebar: React.FC = () => {
    const [collapse, setCollapse] = useState<boolean>(false)
    const [openAttributes, setOpenAttributes] = useState<boolean>(false)

    const handleCollapse = () => setCollapse(!collapse)
    const handleAttributes = () => setOpenAttributes(!openAttributes)

    return (
        <>
            <SidebarPro
                collapsed={collapse}
                collapsedWidth="5em"
                width='18em'
                backgroundColor='#101826'
                id='sidebarPro'
            >
                <Menu
                    menuItemStyles={{
                        button: {
                            boxSizing: 'content-box',
                            color: 'white',
                            padding: '.5em 1.2em',
                            ":hover": {
                                backgroundColor: '#202839'
                            }
                        }
                    }}
                >
                    <div style={{
                        margin: '5%',
                        marginTop: '1.5em'
                    }} >
                        <img src="/logo.png" alt="" style={{
                            marginBottom: '1.5em',
                            width: '100%'
                        }} />
                    </div>
                    <MenuItem icon={<i className="fa-solid fa-boxes fs-4 m-4" />} > Product </MenuItem>
                    <SubMenu label="Attributes"
                        icon={<i className="fa-solid fa-scroll fs-4 m-4" />}
                        open={openAttributes}
                        onClick={handleAttributes}
                    >
                        <MenuItem className='background-color' style={{paddingLeft: '2.5em'}}> Category </MenuItem>
                        <MenuItem className='background-color' style={{paddingLeft: '2.5em'}}> Brand </MenuItem>
                    </SubMenu>
                    <MenuItem icon={<i className="fa-solid fa-archive fs-4 m-4" />}> Order </MenuItem>
                </Menu>
            </SidebarPro>
            <i className="fa-solid fa-bars fs-3 m-4" onClick={handleCollapse} />

        </>
    )
}

export default Sidebar