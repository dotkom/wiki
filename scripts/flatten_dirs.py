import os
import shutil

# Specify the root directory where you want to start the operation
root_dir = 'src/content/docs'

# Walk through the directory structure
for dirpath, dirnames, filenames in os.walk(root_dir):
    # Check if the directory contains only one file named 'index.md'
    if len(filenames) == 1 and len(dirnames) == 0 and filenames[0] == 'index.md':
        # Get the current directory name
        current_dir_name = os.path.basename(dirpath)
        
        # Define the new file name with the directory name
        new_file_name = f"{current_dir_name}.md"
        
        # Define the full path to the index.md file
        index_file_path = os.path.join(dirpath, 'index.md')
        
        # Define the new path where the file should be moved
        new_file_path = os.path.join(os.path.dirname(dirpath), new_file_name)
        
        # Move the file to the parent directory with the new name
        shutil.move(index_file_path, new_file_path)
        
        # Optionally, remove the now empty directory
        os.rmdir(dirpath)