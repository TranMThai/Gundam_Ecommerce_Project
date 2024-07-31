import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar as SidebarPro, SubMenu } from 'react-pro-sidebar';

interface IProps {
    collapse: boolean,
    toggled: boolean
    setToggled: React.Dispatch<React.SetStateAction<boolean>>
    setBroken: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar: React.FC<IProps> = ({ collapse, toggled, setToggled, setBroken }) => {
    const [openAttributes, setOpenAttributes] = useState<boolean>(false)

    const handleAttributes = () => setOpenAttributes(!openAttributes)

    return (
        <>
            <SidebarPro
                collapsed={collapse}
                collapsedWidth="5em"
                width='18em'
                backgroundColor='#1A2023'
                rootStyles={{
                    border: '0',
                    height: '100vh',
                    position: 'sticky',
                    top: 0
                }}
                customBreakPoint="1000px"
                toggled={toggled}
                onBackdropClick={() => setToggled(false)}
                onBreakPoint={setBroken}
            >
                <Menu
                    menuItemStyles={{
                        button: {
                            boxSizing: 'content-box',
                            color: 'white',
                            padding: '.5em 1.2em',
                            ":hover": {
                                backgroundColor: '#444A5A'
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
                    <SubMenu
                        label="Attributes"
                        icon={<i className="fa-solid fa-scroll fs-4 m-4" />}
                        open={openAttributes}
                        onClick={handleAttributes}
                    >
                        <MenuItem
                            style={{
                                paddingLeft: '2.5em',
                                backgroundColor: '#1A2023'
                            }}
                        > Category </MenuItem>
                        <MenuItem
                            style={{
                                paddingLeft: '2.5em',
                                backgroundColor: '#1A2023'
                            }}
                        > Brand </MenuItem>
                    </SubMenu>
                    <MenuItem icon={<i className="fa-solid fa-archive fs-4 m-4" />}> Order </MenuItem>
                </Menu>
            </SidebarPro>
        </>
    )
}

export default Sidebar