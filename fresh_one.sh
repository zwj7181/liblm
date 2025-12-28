target_dir=serve_pack
mkdir -p $target_dir
target_field=@lm_fe
mkdir -p $target_dir/$target_field


compress_all_tow_step()
{
 
    if ([ $# -ge 1 ] && [ -n $1 ]); then
        src_dir=packages/$1
        echo "$src_dir"
        if [ -d $src_dir ]; then
            cd $src_dir
            yarn build > /dev/null 2>&1
            cd ..
            tar -czvf ../$target_dir/$1.tar.gz  $1/package.json $1/dist/* > /dev/null 2>&1
            echo success

        else
            echo no dir !!
            exit 2
        fi

    else
        echo lack of param 1
        exit 2

    fi

}

compress_all_tow_step $@