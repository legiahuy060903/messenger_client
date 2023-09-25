import React from 'react'
import { ConfigProvider, theme } from 'antd';
import { useSelector } from 'react-redux';


const black = 'black';
const light = 'white';
const white_1 = 'rgb(244, 244, 244)';
const ThemeApp = {
    'dark': {
        'bg': black,
        'color': light,
        'algorithm': theme.darkAlgorithm,
        'menu': {
            'bg': black,
            'controlItemBgActive': '#565656',
            'itemColor': light,
            'colorPrimary': light,
            'itemSelectedColor': light
        },
        'Segmented': {
            'itemSelectedBg': light
        }
    },
    'light': {
        'bg': light,
        'color': black,
        'algorithm': theme.defaultAlgorithm,
        'menu': {
            'bg': white_1,
            'controlItemBgActive': light,
            'itemColor': '#606266',
            'colorPrimary': 'red',
            'itemSelectedColor': black
        },
        'Segmented': {
            'itemSelectedBg': 'gray'
        }
    },
}
const ConfigProviderAnt = ({ children }) => {
    const { dark_mode } = useSelector(state => state.account);
    return (
        <ConfigProvider
            theme={{
                algorithm: ThemeApp[dark_mode]['algorithm'],
                token: {
                    bgThemeBlack: ThemeApp[dark_mode].bg,
                    colorBorderWhite: '0.1px solid #444444',
                },
                components: {
                    Input: {
                        hoverBorderColor: 'gray',
                        activeBorderColor: "reset",
                        paddingBlock: 6
                    },
                    Segmented: {
                        itemSelectedBg: ThemeApp[dark_mode]['Segmented']['itemSelectedBg'],
                        borderRadiusSM: 14
                    },
                    Layout: {
                        siderBg: ThemeApp[dark_mode]['menu'].bg,
                        colorBgLayout: ThemeApp[dark_mode].bg,
                    },

                    Modal: {
                        contentBg: ThemeApp[dark_mode].bg,
                        headerBg: ThemeApp[dark_mode].bg,
                    },

                    Select: {
                        colorPrimaryHover: "gray",
                        colorPrimary: "gray"
                    },
                    Menu: {
                        darkItemSelectedBg: "grey",
                        itemPaddingInline: "30px",
                        colorBgContainer: ThemeApp[dark_mode]['menu'].bg,
                        colorPrimary: ThemeApp[dark_mode]['colorPrimary'],
                        itemColor: ThemeApp[dark_mode]['menu']['itemColor'],
                        controlItemBgActive: ThemeApp[dark_mode]['menu']['controlItemBgActive'],
                        itemSelectedColor: ThemeApp[dark_mode]['menu']['itemSelectedColor'],
                    }
                }
            }}
        >
            <div className={`${dark_mode}-mode`}>
                {children}
            </div>
        </ConfigProvider>
    )
}

export default ConfigProviderAnt