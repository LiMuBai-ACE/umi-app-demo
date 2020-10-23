import React from 'react'
import TabBarLayout from './TabBarLayout'
const Index = (props: any) => {
    return (
        <div className="layout_index">
            <div className="layout_content">
                <TabBarLayout {...props} />
            </div>
        </div>
    )
}

export default Index
