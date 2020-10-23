import React from 'react'

const Content = (props: any) => {
    return (
        <div className="layout_content">
            {props.children}
        </div>
    )
}

export default Content
