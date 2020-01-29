'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProjection = getProjection;

var _type = require('graphql/type');

var _todo = require('../../model/todo');

var _todo2 = _interopRequireDefault(_todo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
function getProjection(fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce(function (projections, selection) {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}

var todoType = new _type.GraphQLObjectType({
  name: 'todo',
  description: 'todo item',
  fields: function fields() {
    return {
      itemId: {
        type: _type.GraphQLInt,
        description: 'The id of the todo.'
      },
      item: {
        type: _type.GraphQLString,
        description: 'The name of the todo.'
      },
      completed: {
        type: _type.GraphQLBoolean,
        description: 'Completed todo? '
      }
    };
  }
});

var schema = new _type.GraphQLSchema({
  query: new _type.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      todo: {
        type: new _type.GraphQLList(todoType),
        args: {
          itemId: {
            name: 'itemId',
            type: new _type.GraphQLNonNull(_type.GraphQLInt)
          }
        },
        resolve: function resolve(root, _ref, source, fieldASTs) {
          var itemId = _ref.itemId;

          var projections = getProjection(fieldASTs);
          var foundItems = new Promise(function (resolve, reject) {
            _todo2.default.find({ itemId: itemId }, projections, function (err, todos) {
              err ? reject(err) : resolve(todos);
            });
          });

          return foundItems;
        }
      }
    }
  })

});

exports.default = schema;
//# sourceMappingURL=Schema.js.map
