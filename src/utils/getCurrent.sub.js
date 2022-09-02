gulp_place("consts/info.sub.js", "file_once");/* global info */
gulp_place("./error.sub.js", "file_once");/* global error */
/**
 * @typedef T_cli_arg
 * @type {object}
 * @property {T_info_cmd} command
 * @property {string} param
 */
/**
 * Process cli arguments
 * @param {string[]} args 
 * @returns {T_cli_arg}
 */
function getCurrent(args){
	let command, param, options= {};
	const inArgsList= arg=> ({ args })=> args.includes(arg);
	for(let i=0, { length }= args, ci, arg; i<length; i++){
		arg= args[i];
		ci= info.commands.findIndex(inArgsList(arg));
		if(ci===-1){
			const arg_next= args[i+1];
			const is_arg_next_name= !arg_next || arg_next.indexOf("--")===0;
			Reflect.set(options, arg.replace("--", ""), is_arg_next_name ? true : arg_next);
			if(!is_arg_next_name) i+= 1;
			continue;
		}
		command= info.commands[ci];
		if(!command.param) continue;
		i+= 1;
		param= args[i];
	}
	if(!command)
		command= { cmd: "" };
	if(command.param&&typeof param==="undefined")
		return error(`Missign argument(s).`);
	return { command, param, options };
}
