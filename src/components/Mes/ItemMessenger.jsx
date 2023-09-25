import './mes.scss';
import React, { useEffect, memo } from 'react';
import { BsFillEmojiSmileFill } from 'react-icons/bs';
import { BiSolidShare } from 'react-icons/bi';
const stringText = (length) => {
    let a = `loreattgvtarfnjfdvnijdfnrgnrgregivarigargagstgt argoargg argnogaerg argagg 
    loreattgvtarfnjfdvnijdfnrgnrgregivarigargagstgt argoargg argnogaerg argagg
    loreattgvtarfnjfdvnijdfnrgnrgregivarigargagstgt argoargg argnogaerg argagg 
    loreattgvtarfnjfdvnijdfnrgnrgregivarigargagstgt argoargg argnogaerg argagg 
    loreattgvtarfnjfdvnijdfnrgnrgregivarigargagstgt argoargg argnogaerg argagg
    loreattgvtarfnjfdvnijdfnrgnrgregivarigargagstgt argoargg argnogaerg argagg
    loreattgvtarfnjfdvnijdfnrgnrgregivarigargagstgt argoargg argnogaerg argagg
    loreattgvtarfnjfdvnijdfnrgnrgregivarigargagstgt argoargg argnogaerg argagg 
    loreattgvtarfnjfdvnijdfnrgnrgregivarigargagstgt argoargg argnogaerg argagg
    loreattgvtarfnjfdvnijdfnrgnrgregivarigargagstgt argoargg argnogaerg argagg
    loreattgvtarfnjfdvnijdfnrgnrgregivarigargagstgt argoargg argnogaerg argagg
    loreattgvtarfnjfdvnijdfnrgnrgregivarigargagstgt argoargg argnogaerg argagg 
    loreattgvtarfnjfdvnijdfnrgnrgregivarigargagstgt argoargg argnogaerg argagg
    loreattgvtarfnjfdvnijdfnrgnrgregivarigargagstgt argoargg argnogaerg argagg
    loreattgvtarfnjfdvnijdfnrgnrgregivarigargagstgt argoargg argnogaerg argagg
    loreattgvtarfnjfdvnijdfnrgnrgregivarigargagstgt argoargg argnogaerg argagg 
    loreattgvtarfnjfdvnijdfnrgnrgregivarigargagstgt argoargg argnogaerg argagg
    loreattgvtarfnjfdvnijdfnrgnrgregivarigargagstgt argoargg argnogaerg argagg
    loreattgvtarfnjfdvnijdfnrgnrgregivarigargagstgt argoargg argnogaerg argagg
    loreattgvtarfnjfdvnijdfnrgnrgregivarigargagstgt argoargg argnogaerg argagg  `;
    return a.substr(0, length)
}
const Message = ({ own, l, i }) => {

    useEffect(() => {
    }, []);

    return (
        <div className={`${own ? 'flex-row-reverse mes_box' : " mes_box"}`}>
            <span className='message_text xs:w-[80%] md:w-[40%] '> {stringText(l)}</span>
            <div className="icon_rep_wrapper xs:flex-col md:flex-row">
                <span className='icon_rep__btn' ><BsFillEmojiSmileFill size={15} /></span>
                <span className='icon_rep__btn'><BiSolidShare size={15} /> </span>
            </div>
        </div>
    )
}

export default memo(Message);