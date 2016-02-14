import merge from 'lodash.merge';
import rc from 'rc';

// Resolve extend configs
function resolveExtends(config, prefix = '', key = 'extends') {
	return Object.values(config[key] || [])
		.reduce((merged, extender) => {
			const name = [prefix, extender]
				.filter(String)
				.join('-');
			return merge(
				{},
				merged,
				resolveExtends(require(name))
			);
		}, config);
}

// Get linting config
export default (name = 'conventional-changelog-lint', settings = {
	prefix: 'conventional-changelog-lint-config'
}) => {
	const config = rc(name, settings.defaults);
	return resolveExtends(config, settings.prefix);
};
