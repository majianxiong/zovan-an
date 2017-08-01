/**
 * obj to search
 * @param data
 * @returns {string|*}
 */
export const obj2param = (data, prefix = '') => {
  let qs = Object.entries(data)
  qs.forEach((param, i) => {
    param[0] = prefix + param[0]
    qs[i] = param.join('=')
  })
  return qs.join('&')
}

//  扁平转树结构
export const jsonTree = function (data, config) {
	let id = config.id || 'id',
		pid = config.pid || 'pid',
		children = config.children || 'children'

	let idMap = [],
		jsonTree = []

	data.forEach(v => {
		idMap[v[id]] = v
	})

	data.forEach(v => {
    if(v[pid]){
  		let parent = idMap[v[pid]]
  		if(parent) {
  			!parent[children] && (parent[children] = [])
  			parent[children].push(v)
  		} else {
  			// jsonTree.push(v)
  		}
    }else{
			jsonTree.push(v)
    }
	})

	return {data: jsonTree}
}
