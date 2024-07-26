import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar as SidebarPro, SubMenu } from 'react-pro-sidebar';
import './Sidebar.css'


const Sidebar: React.FC = () => {
    const [toggled, setToggled] = React.useState(false);
    const [collapse, setCollapse] = useState<boolean>(false)
    const [openAttributes, setOpenAttributes] = useState<boolean>(false)
    const [broken, setBroken] = React.useState(window.matchMedia('(max-width: 1200px)').matches);

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
                customBreakPoint="1200px"
                onBreakPoint={setBroken}
                toggled={toggled}
                onBackdropClick={() => setToggled(false)}
                breakPoint="always"
            >
                <Menu
                    rootStyles={{
                        color: 'white'
                    }}
                >
                    <i className="fa-solid fa-bars fs-3 m-4" onClick={handleCollapse} />
                    <MenuItem icon={<i className="fa-solid fa-boxes fs-3 m-4" />}> Product </MenuItem>
                    <SubMenu label="Attributes"
                        icon={<i className="fa-solid fa-scroll fs-3 m-4" />}
                        open={openAttributes}
                        onClick={handleAttributes}
                    >
                        <MenuItem className='background-color'> Category </MenuItem>
                        <MenuItem className='background-color'> Brand </MenuItem>
                    </SubMenu>
                    <MenuItem icon={<i className="fa-solid fa-archive fs-3 m-4" />}> Order </MenuItem>
                </Menu>
            </SidebarPro>
            <div>
                {broken && (
                    <button className="sb-button" onClick={() => setToggled(!toggled)}>
                        Toggle
                    </button>
                )}
            </div>
        </>
    )
}

export default Sidebar