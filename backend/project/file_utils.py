import pathlib
from urllib.request import urlretrieve


def print_progressbar(prefix="", suffix="", decimals=1, length=100, fill="█", printEnd="\r"):

    def progress_hook(count, block_size, total_size):
        progress = count * block_size / total_size
        percent = ("{0:." + str(decimals) + "f}").format(progress * 100)
        filled_length = int(length * progress)
        bar = fill * filled_length + "-" * (length - filled_length)
        print(f"\r{prefix} |{bar}| {percent}% {suffix}", end=printEnd)

    return progress_hook


def download_file(url, filename):
    model_storage_directory = pathlib.Path().parent.parent / filename
    # print(f"Downloading model from {url}")
    urlretrieve(
        url, model_storage_directory, reporthook=print_progressbar(prefix="Progress:", suffix="Complete", length=50)
    )