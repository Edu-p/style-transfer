import os
import shutil


def runModel(path_image_to_transfer, choosed_model):
    if choosed_model == 1:
        path_of_model = 'C:/Users/thami/Downloads/style-transfer-20221018T135318Z-001/style-transfer/cycleGAN/checkpoints/style_monet_pretrained/'
    elif choosed_model == 2:
        path_of_model = 'C:/Users/thami/Downloads/style-transfer-20221018T135318Z-001/style-transfer/cycleGAN/checkpoints/style_vangogh_pretrained/'
    elif choosed_model == 3:
        path_of_model = 'C:/Users/thami/Downloads/style-transfer-20221018T135318Z-001/style-transfer/cycleGAN/checkpoints/style_ukiyoe_pretrained/'
    elif choosed_model == 4:
        path_of_model = 'C:/Users/thami/Downloads/style-transfer-20221018T135318Z-001/style-transfer/cycleGAN/checkpoints/style_cezanne_pretrained/'
    else:
        path_of_model = 'C:/Users/thami/Downloads/style-transfer-20221018T135318Z-001/style-transfer/cycleGAN/checkpoints/style_monet_pretrained/'

    # remover imagens do diretorio que salva imagens
    folder = f'{path_of_model}test_latest/images/'
    for filename in os.listdir(folder):

        file_path = os.path.join(folder, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))

    os.system(
        f'python C:/Users/thami/Downloads/style-transfer-20221018T135318Z-001/style-transfer/cycleGAN/test.py --dataroot {path_image_to_transfer} --name {path_of_model} --model test --gpu_ids -1 --no_dropout')

    # pegar caminho da imagem depois de aplicado o estilo
    path_resposta = ''
    for filename in os.listdir(folder):
        path_resposta = os.path.join(folder, filename)
        break

    # remover imagem do diretorio image_received_target
    folder = 'image_received_target'
    for filename in os.listdir(folder):
        file_path = os.path.join(folder, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))

    return path_resposta
