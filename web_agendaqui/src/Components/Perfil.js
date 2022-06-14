import React, { useState } from 'react';
import styled from 'styled-components';

const ContainerPerfil = styled.div`
    background-color: red;
    min-height: 100vh;
    .box-perfil {
        .box-imagem {
            width: 120px;
            height: 120px;
            background-color: #eee;
            border-radius: 50%;
            box-shadow: 0 0 5px #000;
            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
                cursor: pointer;
            }
        }
        input#inputImg {
            display:none;
        }
    }
`

export default function Perfil() {
    const [imagem, setImagem] = useState('')
    const [imegemPadrao, setImagemPadrao] = useState('img/perfilneutra.jpg')

    const clicarImg = () => {
        let file = document.getElementById('inputImg')
        file.click();
    }

  return (
    <ContainerPerfil>
      <div className='center'>
        <div className='box-perfil'>
            <div className='box-imagem'>
                {imagem ? <img src={URL.createObjectURL(imagem)} alt="Imagem" onClick={clicarImg}/> : <img src={imegemPadrao} alt="Selecione uma imagem" onClick={clicarImg} />}
            </div>

            <input type="file" id='inputImg' accept=".png, .jpg, .jpeg" onChange={e => setImagem(e.target.files[0])}/>
        </div>
      </div>
    </ContainerPerfil>
  );
}
