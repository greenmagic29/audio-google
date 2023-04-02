

#s=()
#for n in ${s[@]};
search_dir="/c/Users/admin/Downloads/audio_testing"
for n in "$search_dir"/*.opus
do
	cp ${n} /c/Users/admin/Downloads/audio_testing/renamed/$(date +%Y%m%d.%H:%M:%S.%3N -r ${n})_file.opus
done