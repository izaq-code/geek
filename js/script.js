window.addEventListener("DOMContentLoaded", function () {
    const fotoContainers = document.querySelectorAll('.foto-container1');
    
    fotoContainers.forEach(function (container) {
        const inputFile = container.querySelector('.foto__input');
        const fotoImage = container.querySelector('.foto__image');
        const removeButton = container.querySelector('.remover-foto1');
        const fotoImageTxt = '';
  
        inputFile.addEventListener("change", function (e) {
            const inputTarget = e.target;
            const file = inputTarget.files[0];
            const index = inputTarget.dataset.index;
  
            if (file) {
                if (!file.type.startsWith('image/')) {
                    Swal.fire({
                        icon: "error",
                        title: "Selecione uma imagem",
                        text: "O arquivo selecionado não é uma imagem.",
                        customClass: {
                            confirmButton: 'swal-button' 
                        }
                    });
                    inputFile.value = '';
                    return;
                }
  
                const fileSizeLimit = 5 * 1024 * 1024;
                if (file.size > fileSizeLimit) {
                    Swal.fire({
                        icon: "error",
                        title: "Espaço excedido...",
                        text: "Apenas imagens abaixo de 5 MB",
                        footer: '<p>Imagem com valor igual ou superior a 5 MB</p>',
                        customClass: {
                            confirmButton: 'swal-button' 
                        }
                    });
                    inputFile.value = ''; 
                    return;
                }
  
                const reader = new FileReader();
  
                reader.addEventListener("load", function (e) {
                    const readerTarget = e.target;
  
                    const img = document.createElement("img");
                    img.src = readerTarget.result;
                    img.classList.add("foto__img");
  
                    fotoImage.innerHTML = "";
                    fotoImage.appendChild(img);
                    
                    inputFile.disabled = true;
                });
  
                reader.readAsDataURL(file);
            } else {
         
         
            }
        });
  
        removeButton.addEventListener("click", function () {
            fotoImage.innerHTML = `${fotoImageTxt}`; 
            inputFile.value = ""; 
     
            inputFile.disabled = false;
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
    
    produtosSalvos.forEach(function(produtoSalvo) {
        const produtoDiv = criarProdutoDiv(produtoSalvo.nome, produtoSalvo.valor, produtoSalvo.urlImagem);
        document.getElementById('containerProdutos').appendChild(produtoDiv);
    });

    document.getElementById('botaoRegistrar').addEventListener('click', function() {
        const nome = document.getElementById('nomeProduto').value;
        const valor = document.getElementById('valorProduto').value;
        const imagemInput = document.getElementById('foto__input9');
        const arquivo = imagemInput.files[0];

        if (nome && valor && arquivo) {
            const leitor = new FileReader();
            leitor.onload = function(e) {
                const urlImagem = e.target.result;

                const produtoDiv = criarProdutoDiv(nome, valor, urlImagem);
                document.getElementById('containerProdutos').appendChild(produtoDiv);

                const produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
                produtosSalvos.push({ nome: nome, valor: valor, urlImagem: urlImagem });
                localStorage.setItem('produtos', JSON.stringify(produtosSalvos));
            };
            leitor.readAsDataURL(arquivo);
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });

    document.getElementById('limparBtn').addEventListener('click', function() {
        document.getElementById('nomeProduto').value = '';
        document.getElementById('valorProduto').value = '';
      
        const fotoContainers = document.querySelectorAll('.foto-container1');
        fotoContainers.forEach(function(container) {
            const inputFile = container.querySelector('.foto__input');
            const fotoImage = container.querySelector('.foto__image');
            const fotoImageTxt = '';
    
            fotoImage.innerHTML = `${fotoImageTxt}`; 
            inputFile.value = ""; 
            inputFile.disabled = false;
        });
    });
    
});

function criarProdutoDiv(nome, valor, urlImagem) {
    const produtoDiv = document.createElement('div');
    produtoDiv.className = 'produto';

    const img = document.createElement('img');
    img.src = urlImagem;
    img.alt = nome;

    const imgDiv = document.createElement('div');
    imgDiv.className = 'img-container';
    imgDiv.appendChild(img);

    const produtoDetalhesDiv = document.createElement('div');
    produtoDetalhesDiv.className = 'produto-detalhes';

    const nomeProduto = document.createElement('p');
    nomeProduto.textContent = `${nome}`;

    const valorProduto = document.createElement('p');
    valorProduto.textContent = `R$ ${valor}`;

    produtoDetalhesDiv.appendChild(nomeProduto);
    produtoDetalhesDiv.appendChild(valorProduto);

    const botaoExcluir = document.createElement('button');
    botaoExcluir.innerHTML = '<i class="bi bi-trash-fill"></i>';
    botaoExcluir.className = 'btn btn-danger exc';  
    botaoExcluir.addEventListener('click', function() {
        produtoDiv.remove();
        
        const produtosSalvos = JSON.parse(localStorage.getItem('produtos')) || [];
        const index = produtosSalvos.findIndex(function(produto) {
            return produto.nome === nome && produto.valor === valor && produto.urlImagem === urlImagem;
        });
        if (index !== -1) {
            produtosSalvos.splice(index, 1);
            localStorage.setItem('produtos', JSON.stringify(produtosSalvos));
        }
    });

    produtoDiv.appendChild(imgDiv); // Adiciona imgDiv ao invés de img diretamente
    produtoDiv.appendChild(produtoDetalhesDiv);
    produtoDiv.appendChild(botaoExcluir);

    return produtoDiv;
}